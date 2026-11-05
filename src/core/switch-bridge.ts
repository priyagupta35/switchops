import type {
  SwitchMessage,
  SwitchParticipant,
  SwitchRoomState,
  SwitchPlatform,
} from './types.ts';

export type MessageHandler = (message: SwitchMessage) => Promise<string | void>;

export class SwitchBridge {
  private roomId: string;
  private roomName: string;
  private platform: SwitchPlatform;
  private participants: Map<string, SwitchParticipant> = new Map();
  private messageListeners: MessageHandler[] = [];
  private state: SwitchRoomState;

  constructor(
    roomId = 'incident-war-room-402',
    roomName = '#incident-war-room',
    platform: SwitchPlatform = 'slack'
  ) {
    this.roomId = roomId;
    this.roomName = roomName;
    this.platform = platform;

    this.state = {
      roomId: this.roomId,
      roomName: this.roomName,
      participants: [],
      status: 'DETECTED',
    };

    // Default room participants (human on-call engineer, SRE lead, and SwitchOps agent)
    this.registerParticipant({
      id: 'agent_switchops',
      name: 'SwitchOps',
      role: 'agent',
      title: 'Autonomous Incident Commander (Powered by Switch AI)',
    });

    this.registerParticipant({
      id: 'human_sre_lead',
      name: 'Jordan Rivera (SRE Lead)',
      role: 'human',
      title: 'Staff Site Reliability Engineer',
    });

    this.registerParticipant({
      id: 'human_dev_alex',
      name: 'Alex (Backend Dev)',
      role: 'human',
      title: 'Senior Software Engineer',
    });
  }

  registerParticipant(participant: SwitchParticipant): void {
    this.participants.set(participant.id, participant);
    this.state.participants = Array.from(this.participants.values());
  }

  onMessage(handler: MessageHandler): void {
    this.messageListeners.push(handler);
  }

  /**
   * Dispatches a message into the Switch room.
   */
  async sendMessage(senderId: string, text: string, metadata?: Record<string, any>): Promise<SwitchMessage> {
    const sender = this.participants.get(senderId) || {
      id: senderId,
      name: senderId,
      role: 'human',
    };

    const message: SwitchMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      roomId: this.roomId,
      sender,
      text,
      timestamp: new Date().toISOString(),
      platform: this.platform,
      metadata,
    };

    // If message came from a human and mentions @SwitchOps or contains alert, notify listeners
    if (sender.role === 'human') {
      for (const listener of this.messageListeners) {
        const reply = await listener(message);
        if (reply) {
          await this.sendMessage('agent_switchops', reply);
        }
      }
    }

    return message;
  }

  getState(): SwitchRoomState {
    return this.state;
  }

  updateState(partial: Partial<SwitchRoomState>): void {
    this.state = { ...this.state, ...partial };
  }
}
