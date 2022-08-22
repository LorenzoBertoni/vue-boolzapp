var DateTime = luxon.DateTime;

const app = new Vue({
    el: '#app',
    data: {
        user: {
            name: 'Lorenzo',
            avatar: '_7'
        },
        emojis: [
            '👌', '🤣', '😊', '😁', '😘', '🎉', '😍', '❤', '🤷‍♂️', '👏', '🤦‍♂️'
        ],
        activeContact: 0,
        input: '',
        searchBarInput: '',
        newContactInput: '',
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [
                            {
                                date: '15:30',
                                message: 'Hai portato a spasso il cane?',
                                status: 'sent'
                            },
                            {
                                date: '15:50',
                                message: 'Ricordati di stendere i panni',
                                status: 'sent'
                            },
                            {
                                date: '16:15',
                                message: 'Tutto fatto!',
                                status: 'received'
                            }
                        ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [
                            {
                                date: '16:30',
                                message: 'Ciao come stai?',
                                status: 'sent'
                            },
                            {
                                date: '16:30',
                                message: 'Bene grazie! Stasera ci vediamo?',
                                status: 'received'
                            },
                            {
                                date: '16:35',
                                message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                                status: 'sent'
                            }
                        ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [
                            {
                                date: '10:10',
                                message: 'La Marianna va in campagna',
                                status: 'received'
                            },
                                {
                                date: '10:20',
                                message: 'Sicuro di non aver sbagliato chat?',
                                status: 'sent'
                            },
                            {
                                date: '16:15',
                                message: 'Ah scusa!',
                                status: 'received'
                            }
                        ],
            },
            {
                name: 'Alessandro B.',
                avatar: '_4',
                visible: true,
                messages: [
                            {
                                date: '15:30',
                                message: 'Lo sai che ha aperto una nuova pizzeria?',
                                status: 'sent'
                            },
                            {
                                date: '15:50',
                                message: 'Si, ma preferirei andare al cinema',
                                status: 'received'
                            }
                        ],
            },
            {
                name: 'Alessandro L.',
                avatar: '_5',
                visible: true,
                messages: [
                            {
                                date: '15:30',
                                message: 'Ricordati di chiamare la nonna',
                                status: 'sent'
                            },
                            {
                                date: '15:50',
                                message: 'Va bene, stasera la sento',
                                status: 'received'
                            }
                        ],
            },
            {
                name: 'Claudia',
                avatar: '_6',
                visible: true,
                messages: [
                            {
                                date: '15:30',
                                message: 'Ciao Claudia, hai novità?',
                                status: 'sent'
                            },
                            {
                                date: '15:50',
                                message: 'Non ancora',
                                status: 'received'
                            },
                            {
                                date: '15:51',
                                message: 'Nessuna nuova, buona nuova',
                                status: 'sent'
                            }
                        ],
            },
            {
                name: 'Federico',
                avatar: '_7',
                visible: true,
                messages: [
                            {
                                date: '15:30',
                                message: 'Fai gli auguri a Martina che è il suo compleanno!',
                                status: 'sent'
                            },
                            {
                                date: '15:50',
                                message: 'Grazie per avermelo ricordato, le scrivo subito!',
                                status: 'received'
                            }
                        ],
            },
            {
                name: 'Davide',
                avatar: '_8',
                visible: true,
                messages: [
                            {
                                date: '15:30',
                                message: 'Ciao, andiamo a mangiare la pizza stasera?',
                                status: 'received'
                            },
                            {
                                date: '15:50',
                                message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                                status: 'sent'
                            },
                            {
                                date: '15:51',
                                message: 'OK!!',
                                status: 'received'
                            }
                        ],
            }
        ]
    },
    computed: {
        getHour() {
            const date = DateTime.now().minus({minutes: 15}).toFormat('HH:mm');
            return date;
        }
    },
    methods: {
        changeChat(index) {
            this.activeContact = index;
        },
        sendMessage() {
            if (!this.input.trim() == '') {
                this.contacts[this.activeContact].messages.push(
                    {
                        date: this.getMsgHour(),
                        message: this.input.trim(),
                        status: 'sent'
                    }
                )
                this.input = '';
                setTimeout(this.getReply, 1000);
            }
        },
        getReply() {
            let text =  {
                        date: this.getMsgHour(),
                        message: 'Ok',
                        status: 'received'
                        };
            this.contacts[this.activeContact].messages.push(text);
        },
        search() {
            this.contacts.forEach(contact => {
                if(contact.name.toLowerCase().includes(this.searchBarInput)) {
                    contact.visible = true;
                } else {
                    contact.visible = false;
                }
            });
        },
        getMsgActions(index) {
            let menu = document.querySelectorAll('.message-actions');
            menu[index].classList.toggle('hidden');
        },
        deleteMessage(index) {
            let msgArray = this.contacts[this.activeContact].messages;
            msgArray.splice(index, 1);
        },
        getDesktopNotif() {
            let notifications = document.querySelector('.notifications');
            notifications.classList.add('hidden');
            alert('notifiche attivate');
        },
        getMsgHour() {
            const date = DateTime.now().toFormat('HH:mm');
            return date;
        },
        showEmojis() {
            const emojis = document.querySelector('.emojis-icons');
            emojis.classList.toggle('hidden');
        },
        getEmoji(index) {
            this.input += this.emojis[index];
        },
        openModal(){
            const modal = document.getElementById('myModal');
                modal.classList.remove('hidden');
        },
        closeModal(){
            const modal = document.getElementById('myModal');
            modal.classList.add('close-input');
        },
        addNewContact() {
            this.contacts.push(
                                {
                                    name: this.newContactInput,
                                    avatar: '_8',
                                    visible: true,
                                    messages: []
                                }
            );
            this.newContactInput = '';
        }
    }
});