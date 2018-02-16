import Vue from 'vue';
import $ from 'jquery';
import template from '../../tmp/components/comments.html';
import Helper from '../mixins/HelperMixin';
import Materialize from 'materialize-css';

const Comment = Vue.extend({
    template,
    props: [ 'isLogin',  'type', 'unique'],
    mixins: [Helper],
    data(){
        return {
            content: "",
            offset: 0,
            comments: [],
        }
    },
    created(){
        this.getComments()  
    },
    methods: {
        create(){
            let self = this,
                uri = `/api/1/send/`;
            self.content = self.content.replace(/^\s*/,'').replace(/\s*$/,'')
            if (self.content === ""){
                return;
            }

        fetch(uri, {
                method: "POST", 
                body: `sessionid=${self.getSess()}&content=${self.content}&app=${self.type}&key=${self.unique}`,
                headers: {
                    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" 
                },
            })
            .then(response => response.json())
            .then(data => {
                if (data.success){
                    self.info("Комментарий отправлен!")
                    self.getComments()
                }
                self.content = ""
            })
            .catch(error => console.error(error))
        },
        getComments(){
            let self = this,
                uri = `/api/1/comment/${self.type}/${self.unique}/${self.offset}`;
                fetch(uri, { method: "GET" })
                    .then(response => {
                        return response.json()
                    })
                    .then(data => {
                        self.comments = data.comments
                    })
                    .catch(error => {
                        console.log(error)
                    })
        },
        setName(name){
            this.getter = name
            this.content = name + ", " + this.content
            document.querySelectorAll(".__comment label")[0].className = " active"
            document.querySelectorAll(".__comment input")[0].focus()
        }
    }

})

export default Comment  