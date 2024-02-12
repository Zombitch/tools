import { Controller, HttpCode, HttpStatus, Get, Req, Param, Session } from '@nestjs/common';
import { AllowAnonymous } from '../core/auth/auth.guard';
import { ThreadMessage, ThreadMessagesPage } from 'openai/resources/beta/threads/messages/messages';
import { OpenAIController } from './openai.controller';

@Controller('lostphoneai')
export class LostPhoneAIController extends OpenAIController {
    protected assistantID: string = "asst_VaCqt4Qp9vkR4HDJqknTuB2F";

    /**
     * Deal with authentication, login the user and return access_token
     * @param body
     * @returns 
     */
    @AllowAnonymous()
    @HttpCode(HttpStatus.OK)
    @Get('talk/:text/:threadID?')
    async talk(@Param() params: any) {
        const threadID: string = await this.createThread(params.threadID, params.text);
        const run = await this.openAI.beta.threads.runs.create(threadID, { assistant_id: this.assistantID });

        // Wait for OpenAI process to complete
        await this.waitForComplete(threadID, run.id);

        // Retrieve messages
        const messages: ThreadMessage | ThreadMessagesPage = await this.openAI.beta.threads.messages.list(threadID);

        return {
            "threadID": threadID,
            "text": messages.data[0].content[0]["text"]["value"]
        }
    }
}