<template>
    <ul class="dropdown-menu multi-level" role="menu" aria-labelledby="dropdownMenu">
        <li v-for="node in nodes" :class="node.nodes.length > 0 ? 'dropdown-submenu': ''">
            <a v-if="node.nodes.length > 0" class="parent-a">{{ node.label }}</a>
            <a v-if="node.nodes.length === 0" @click="select(node)" class="parent-end">{{ node.label }}</a>
            <multi-level-dropdown
                    :nodes="node.nodes"
                    :id="node.id"
                    :label="node.label"
                    v-if="node.nodes.length > 0">
            </multi-level-dropdown>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "MultiLevelDropdown",
        props: ['id', 'label', 'nodes'],
        data() {
            return {

            }
        },
        methods: {
            select(node) {
                Event.$emit('passcoFetchStart');
                axios.post(BasePath + 'year-past-questions/', {path: node.id})
                    .then(response => {
                        // console.log(response.data);
                        Event.$emit('passcoYearSelected', response.data);
                        Event.$emit('passcoFetchSuccess', node.id);
                    })
                    .catch(error => {
                        Event.$emit('passcoFetchError');
                        console.log(error.response.data.error);
                    });
            }
        },

        mounted() {
            $(document).ready(function () {
                $('.dropdown-submenu a.parent-a').on("click", function (e) {
                    //$(this).next('ul').toggle();
                    e.stopPropagation();
                    //  e.preventDefault();
                });
            });
        }
    }
</script>

<style scoped>

    .dropdown-submenu {
        position: relative;
        text-align:left;
        /*padding-left: 10px;*/
    }

    .dropdown-menu {
        text-align:left;
        /*padding-left: 10px;*/
    }

    .single-menu {
        text-align:left;
        padding-left: 10px;
    }

    .dropdown-submenu>.dropdown-menu {
        top: 0;
        left: 100%;
        margin-top: -6px;
        margin-left: -1px;
        -webkit-border-radius: 0 6px 6px 6px;
        -moz-border-radius: 0 6px 6px;
        border-radius: 0 6px 6px 6px;
    }

    .dropdown-submenu:hover>.dropdown-menu {
        display: block;
    }

    .dropdown-submenu>a:after {
        display: block;
        content: " ";
        float: right;
        width: 0;
        height: 0;
        border-color: transparent;
        border-style: solid;
        border-width: 5px 0 5px 5px;
        border-left-color: #ccc;
        margin-top: 5px;
        margin-right: -10px;
    }

    li {
        padding-left: 10px;
    }

    li:hover {
        background-color:#E5F1FB;
        color: white;
    }

    /*li>a.parent-end {
        text-align: center;
    }*/

    .dropdown-submenu:hover>a:after {
        border-left-color: #fff;
    }

    /* .dropdown-submenu.pull-left {
        float: none;
    }

    .dropdown-submenu.pull-left>.dropdown-menu {
        left: -100%;
        margin-left: 10px;
        -webkit-border-radius: 6px 0 6px 6px;
        -moz-border-radius: 6px 0 6px 6px;
        border-radius: 6px 0 6px 6px;
    } */


    h2 {
        width: 250px;
        margin-right: auto;
        margin-left: auto;
    }

    h1 {
        text-align: center;
        margin-top: 40px;
        margin-bottom: 40px;
    }



    /********** Small devices**********/
    @media (max-width: 767px) {
        .dropdown-submenu>.dropdown-menu {
            top: 100%;
            left: 40px;
            margin-top: -6px;
            margin-left: -1px;
            -webkit-border-radius: 0 6px 6px 6px;
            -moz-border-radius: 0 6px 6px;
            border-radius: 0 6px 6px 6px;
        }
    }

    /* @media only screen and (max-width: 480px) {
        h1,.h1{
            font-size:22px;
        }
        h2,.h2{
            font-size:20px;
        }
        h3,.h3{
            font-size:18px;
        }
        .option {
            font-size: 16px;
            padding: 6px;
        }
    } */

</style>
