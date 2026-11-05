import type { SwitchMessage, SwitchPlatform } from '../core/types.ts';

export class SwitchChannelAdapter {
  static formatForPlatform(message: SwitchMessage, targetPlatform: SwitchPlatform): any {
    switch (targetPlatform) {
      case 'slack':
        return {
          channel: message.roomId,
          text: message.text,
          blocks: [
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: `*${message.sender.name}* (${message.sender.role}):\n${message.text}`,
              },
            },
          ],
        };

      case 'discord':
        return {
          content: message.sender.role === 'agent' ? `🤖 **[Switch Agent: ${message.sender.name}]**` : `👤 **${message.sender.name}**:`,
          embeds: [
            {
              description: message.text,
              color: message.sender.role === 'agent' ? 0x00ff88 : 0x5865f2,
              timestamp: message.timestamp,
            },
          ],
        };

      case 'teams':
        return {
          type: 'message',
          attachments: [
            {
              contentType: 'application/vnd.microsoft.card.adaptive',
              content: {
                type: 'AdaptiveCard',
                version: '1.4',
                body: [
                  {
                    type: 'TextBlock',
                    text: `${message.sender.name} via Switch`,
                    weight: 'Bolder',
                  },
                  {
                    type: 'TextBlock',
                    text: message.text,
                    wrap: true,
                  },
                ],
              },
            },
          ],
        };

      default:
        return message.text;
    }
  }
}
