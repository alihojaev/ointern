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
    </div>
</template>
<script>
    import axios from "axios";

    export default {
        comments: {
            axios
        },
        data: () => ({
            weather: []
        }),
        computed: {},
        methods: {
            initialize() {
                axios.get('http://api.worldweatheronline.com/premium/v1/weather.ashx?q=Bishkek&format=JSON&extra=&num_of_days=1&key=02a205e494a34e8fbce113550202206')
                    .then(response => {
                        console.log(response.data.data.weather[0]);
                        this.weather = response.data.data.weather[0]
                    })
            }
        },
        created() {
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
