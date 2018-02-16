import Vue from 'vue';
import $ from 'jquery';
import Materialize from 'materialize-css';
import Helper from '../mixins/HelperMixin';
import template from '../../tmp/components/search.html';

const Search = Vue.extend({
    template,
    mixins: [Helper],
    data() {
        return {
            tagFont: 12,
            showField: false,
            isFilled: false,
            showSearchResult: true,
            keyword: "",
            tags: [],
            blogs: [],
            events: [],
            places: [],
        }
    },
    mounted(){
        this.getTags()
    },
    methods: {
        setKeyword(key){
            let self = this
            self.keyword = key
            self.isFilled = true
            self.search(self.keyword);
        },
        search(key){
            let self = this,
                uri = `/api/1/search/default/${key}`;
            
            fetch(uri, {method: 'GET'})
                .then(response => {
                    return response.json()
                })
                .then(items => {
                    self.blogs = items.blogs;
                    self.events = items.events;
                    self.places = items.places;
                    if (self.events.length > 0 || self.places.length > 0 || self.posts.length > 0){
                        self.info("Что-то нашлось!");
                    } else {
                        self.info("Ничего нет по запросу!");
                    }
                })
                .catch(error => {
                    console.error(error)
                })
        },
        getTags(){
            let self = this,
                uri = "/api/1/search/tags";

            fetch(uri, {method: 'GET'})
                .then(response => {
                    return response.json()
                })
                .then(tags => {
                    self.tags = tags
                })
                .catch(error => {
                    console.error(error)
                })
        }
    }
})

export default Search;
