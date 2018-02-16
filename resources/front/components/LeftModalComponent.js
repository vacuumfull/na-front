import Vue from 'vue';
import $ from 'jquery';
import template from '../../tmp/components/left-modal.html';
import Materialize from 'materialize-css';

const LeftModal = Vue.extend({
    template,
    mixins:[Helper],
    props: ['user-info'],
    data(){
        return {
            message: '',
            getter: '',
        }
    },
    watch:{
        userInfo(val){
            if (val['name'] !== ''){
                this.getter = val['name'];
                this.openModal();
            }
        }
    },
    mounted(){
        $('#left_message_window').modal();
    },
    methods: {
        sendMessage(){
            let uri = '/api/1/message',
                self = this;
            if (self.message.length === 0){
                return;
            }
            fetch(uri, {
                    method: "POST", 
                    body: `sessionid=${self.getSess()}&message=${self.message}`,
                    headers: {
                        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" 
                    },
                })
                .then(response => response.json())
                .then(data => {
                    self.info("Сообщение успешно отправлено!");
                    $('#left_message_window').modal('close');
                })
                .catch(error => console.error(error))
        },
        openModal(){
            $('#left_message_window').modal('open');
        },
    }
})

export default LeftModal;
