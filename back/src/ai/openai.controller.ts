import { Controller, Body, Post, HttpCode, HttpStatus, Get, Req, Param, Session } from '@nestjs/common';
import { AuthService } from 'src/core/auth/auth.service';
import { AllowAnonymous } from '../core/auth/auth.guard';
import { OpenAI } from "openai";
import { Thread } from 'openai/resources/beta/threads/threads';
import { MessageCreateParams, ThreadMessage, ThreadMessagesPage } from 'openai/resources/beta/threads/messages/messages';

@Controller('ai')
export class OpenAIController {
    private openAI: OpenAI;
    private key: string = "";
    private assistantID: string = "";

    constructor(private authService: AuthService) {
        this.openAI = new OpenAI({apiKey: this.key});
    }

    /**
     * Deal with authentication, login the user and return access_token
     * @param body
     * @returns 
     */
    @AllowAnonymous()
    @HttpCode(HttpStatus.OK)
    @Get('talk/:text')
    async talk(@Session() session: Record<string, any>, @Param() params: any) {
        const createdThread: string = await this.createThread(session["threadID"], params.text);

        // Update session threadID value
        session["threadID"] = createdThread;

        const run = await this.openAI.beta.threads.runs.create(createdThread, { assistant_id: this.assistantID });

        // Wait for OpenAI process to complete
        await this.waitForComplete(createdThread, run.id);

        // Retrieve messages
        const messages: ThreadMessage | ThreadMessagesPage = await this.openAI.beta.threads.messages.list(createdThread);

        return messages.data[0].content[0]["text"]["value"];
    }

    private async createThread(threadID: string|undefined ,inputText: string): Promise<string>{
        let message: MessageCreateParams = {"role": "user", "content": inputText};
        if(!threadID){
            const thread: Thread = await this.openAI.beta.threads.create({ messages: [ message] });
            threadID = thread.id;
        }
        else await this.openAI.beta.threads.messages.create(threadID, message);
        
        return threadID;
    }

    private async waitForComplete(threadID: string, runID: string){
        await new Promise(resolve => setTimeout(resolve, 7000));
        const run = await this.openAI.beta.threads.runs.retrieve(threadID, runID);

        if(['QUEUED', 'IN_PROGRESS'].includes(run.status.toUpperCase())){
            await this.waitForComplete(threadID, runID);
        }
    }
}
