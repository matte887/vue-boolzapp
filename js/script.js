// Stringa per far funzionare dayJS
dayjs.extend(window.dayjs_plugin_customParseFormat);

const app = new Vue({
    el: '#root',
    data: {
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Ricordati di stendere i panni',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        message: 'CLICCA COL TASTO DESTRO per il menù a tendina :)',
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
                        date: '20/03/2020 16:30:00',
                        message: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        message: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
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
                        date: '28/03/2020 10:10:40',
                        message: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        message: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
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
                        date: '10/01/2020 15:30:55',
                        message: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
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
                        date: '10/01/2020 15:30:55',
                        message: 'Ricordati di chiamare la nonna',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
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
                        date: '10/01/2020 15:30:55',
                        message: 'Ciao Claudia, hai novità?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Non ancora',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 15:51:00',
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
                        date: '10/01/2020 15:30:55',
                        message: 'Fai gli auguri a Martina che è il suo compleanno!',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
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
                        date: '10/01/2020 15:30:55',
                        message: 'Ciao, andiamo a mangiare la pizza stasera?',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:51:00',
                        message: 'OK!!',
                        status: 'received'
                    }
                ],
            }
        ],
        activeContact: 0,
        message: '',
        newReply: '',
        newResearch: '',
        hideContact: '',
        thisMessage: ''
    },
    methods: {
        selectContact: function(index) {
            this.activeContact = index;
        },
        sendMessage: function(index) {
            const newMessage = {
                date: this.getCurrentTime(),
                message: this.message,
                status: 'sent'
            };
            this.contacts[index].messages.push(newMessage);
            this.message= '';

            const timedReply = setTimeout(() => {
                this.contacts[index].messages.push(this.newReceivedMessage());
            }, 1000);
        },
        newReceivedMessage() {
            return this.newReply = {
                date: this.getCurrentTime(),
                message: 'Ok!',
                status: 'received'
            }
        },
        searchContact: function() {
            this.contacts.forEach(contact => {
                const formattedName = contact.name.toLowerCase().trim();
                const formattedSearch = this.newResearch.toLowerCase().trim();
                if (formattedName.includes(formattedSearch)) {
                    contact.visible = true;
                } else {
                    contact.visible = false;
                }
            });
        },
        showOptions: function(index) {
            this.thisMessage = index;
        },
        deleteMessage: function(index) {
            // event bubbling
            this.contacts[this.activeContact].messages.splice(index, 1);
            this.thisMessage = '';
        },

        // funzioni per gestire date/orari con dayJS
        getCurrentTime() {
            return dayjs().format('DD/MM/YYYY HH:mm:ss');
        },
        getTime(date) {
            const dayjsDate = dayjs(date, 'DD/MM/YYYY HH:mm:ss');
            return dayjsDate.format('HH:mm')
        },
        
        // funzione per fare in modo che il menù a tendina scompaia se clicco fuori dal menù stesso
        clickAway() {
            this.thisMessage = '';
        },

        // funzione per gestire il click col tasto destro
        handler: function(e, index) {
            this.showOptions(index);
            e.preventDefault();
        }
    }
});