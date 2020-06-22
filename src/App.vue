<template>
    <div id="appRoot">
        <div class="search-header">
            <input v-model="searchVal" placeholder="Введите данные для поиска" style="width: 90vw">
            <button style="width: 10vw" @click="search">Искать</button>
        </div>
        <div v-for="item in result" style="border: 1px solid #cccccc; margin: 5px; padding: 10px; border-radius: 10px">
            <a :href="item.link">
                <strong style="color: #0074D9">{{item.title}}</strong><br>
                <span v-html="item.htmlSnippet" style="color: black"/><br>
                <span style="color: #9e9e9e">{{item.displayLink}}</span>
            </a>

        </div>
    </div>
</template>
<script>
    import axios from "axios";

    export default {
        comments: {
            axios
        },
        data: () => ({
            searchVal: "",
            result: []
        }),
        computed: {},
        methods: {
            search() {
               if (this.searchVal.length > 0) {
                   axios.get('https://www.googleapis.com/customsearch/v1?key=AIzaSyC99dihJsCoEbbR-M68GtWfL3n2lGigIRQ&cx=003740742827908429876:n6-rptgxn0i&q=' + this.searchVal)
                       .then(response => {
                           console.log(response.data);
                           this.result = response.data.items
                       })
               }
            }
        },
        beforeMount() {
        }
    };
</script>

<style lang="stylus" scoped>
    .search-header {
        display: flex
    }
    a {
        text-decoration none
    }
</style>
