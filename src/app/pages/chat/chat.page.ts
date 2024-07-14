import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  conversations = [
    {
      title: 'Conversation with John Doe',
      messages: [
        {
          avatar: 'https://via.placeholder.com/150',
          name: 'John Doe',
          text: 'Hey, how are you?',
          time: '10:30 AM'
        },
        {
          avatar: 'https://via.placeholder.com/150',
          name: 'Jane Smith',
          text: 'I am good, thank you! How about you?',
          time: '10:32 AM'
        }
      ]
    },
    {
      title: 'Conversation with Jane Smith',
      messages: [
        {
          avatar: 'https://via.placeholder.com/150',
          name: 'John Doe',
          text: 'I am doing great, thanks for asking!',
          time: '10:34 AM'
        },
        {
          avatar: 'https://via.placeholder.com/150',
          name: 'Jane Smith',
          text: 'Great to hear!',
          time: '10:36 AM'
        }
      ]
    }
  ];

  seeFullConversation(conversation: any) {
    // Logic to navigate to the full conversation view
    console.log('See full conversation:', conversation);
  }

}
