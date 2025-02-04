import { TestBed } from '@angular/core/testing';

import { ChatService } from './servicio-chat.service';

describe('ServicioChatService', () => {
  let service: ChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
