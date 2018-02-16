import Vue from 'vue';
import $ from 'jquery';
import Storage from '../mixins/StorageMixin';
import Helper from '../mixins/HelperMixin';
import template from '../../tmp/components/left-messages.html';

const LeftMessages = Vue.extend({
    template,
    props: ['user-role'],
    mixins: [Storage, Helper],
    data(){
        return {
            showField: false,
            getter: '',
            users: [{ name: "Ivan" }]
        }
    },
    created(){
        this.getUsers();
    },
    methods: {
        openField(){
            this.showField = true;
        },
        search(event){
            let self = this,
                keyword = event.target.value,
                users = self.storageGet('users');
            if (keyword.length <= 2) return;
            self.users = users.filter((item) => {
                return item.username.indexOf(keyword) === 0;
            })
           
        },
        getUsers(){
            let self = this,
                session = self.getSess(),
                uri = `/api/1/users/${session}`;

            fetch(uri, {method: 'GET'})
                .then(response => {
                    return response.json()
                })
                .then(items => {
                    items.map(item => item.unread=[])
                    self.storageSave('users', items);
                })
                .catch(error => {
                    console.error(error)
                })
        },
        selectGetter(event){
            let userInfo = {};
                userInfo['name'] = event.target.innerText;

            this.$emit('open-modal', userInfo);
            this.showField = false;
        }
    }

})

export default LeftMessages;
