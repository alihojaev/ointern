<template>
    <div id="appRoot">
        Прогноз || Дата {{ weather.date }} || Закат: {{weather.astronomy[0].sunrise }} || Рассвет: {{ weather.astronomy[0].sunset}}
        <div v-for="item in weather.hourly">
            <table>
                <tr>
                    <td style="width: 20px">
                        <img :src="item.weatherIconUrl[0].value" style="width: 30px">
                    </td>
                    <td style="width: 100px">
                        время: {{item.time / 100}}
                    </td>
                    <td style="width: 50px">
                        {{item.tempC }}C
                    </td>
                    <td style="width: 120px">
                        ветер: {{item.windspeedKmph}} км/ч
                    </td>
                    <td style="width: 140px">
                        влажность: {{item.humidity}} %
                    </td>
                </tr>
            </table>
        </div>
        Курс валют к USD
            <table>
                <tr><td style="width: 60px">EUR:</td><td style="width: 150px">{{rate.rates.EUR}}</td></tr>
                <tr><td style="width: 60px">RUB:</td><td style="width: 150px">{{rate.rates.RUB}}</td></tr>
                <tr><td style="width: 60px">JPY:</td><td style="width: 150px">{{rate.rates.JPY}}</td></tr>
                <tr><td style="width: 60px">PHP:</td><td style="width: 150px">{{rate.rates.PHP}}</td></tr>
                <tr><td style="width: 60px">GBP:</td><td style="width: 150px">{{rate.rates.GBP}}</td></tr>
                <tr><td style="width: 60px">TRY:</td><td style="width: 150px">{{rate.rates.TRY}}</td></tr>
            </table>
        Новости
        <br>
        <iframe src="/lenta.html" name="myFrame" width="1000px" height="500px" v-if="showNews"></iframe>
        <p><a href="https://knews.kg/" target="myFrame" @click="showNews = true">Показать новости</a></p>
    </div>
</template>
<script>
    import axios from "axios";

    export default {
        comments: {
            axios
        },
        data: () => ({
            weather: [],
            rate: [],
            showNews: false
        }),
        computed: {},
        methods: {
            initialize() {
                axios.get('http://api.worldweatheronline.com/premium/v1/weather.ashx?q=Bishkek&format=JSON&extra=&num_of_days=1&key=02a205e494a34e8fbce113550202206')
                    .then(response => {
                        console.log(response.data.data.weather[0]);
                        this.weather = response.data.data.weather[0]
                    })
                axios.get(' https://api.exchangeratesapi.io/latest?base=USD')
                    .then(response => {
                        console.log(response.data);
                        this.rate = response.data
                    })
            }
        },
        beforeMount() {
            this.initialize()
        }
    };
</script>

<style lang="stylus" scoped>
    td {
        border 1px solid #cccccc
       text-align: center;
    }
</style>
