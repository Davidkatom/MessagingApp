class ContactElm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            contact_name: props.contact_name,
            chat_history: [],
            last_message: 'David loves to eat food and drink beer',
            last_message_time: 'empty time',
        };
    }

}

export default ContactElm