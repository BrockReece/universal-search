<template>
  <div id="app" class="ui container">
    <div class="ui form">
        <div class="ui field">
            <div class="ui big input" :class="{right: filters.length, labeled: filters.length}">
                <input v-model="search" />
                <div v-for="filter in filters" class="ui tag label" :class="{[filter.color]: true}">
                    {{ filter.label }}
                    <i @click="removeFilter(filter)" class="remove link icon"></i>
                </div>
            </div>
        </div>
    </div>
    <div v-if="types.length > 1">
        <label>Type:</label>
        <div class="ui blue tag label" v-for="type in types" @click="applyTypeFilter(type.key)">{{ type.key | singularize }} - {{ type.doc_count }}</div>
    </div>
    <div v-if="statuses.length > 1">
        <label>Status:</label>
        <div class="ui yellow tag label" v-for="status in statuses" @click="applyStatusFilter(status.key)">{{ status.key | singularize }} - {{ status.doc_count }}</div>
    </div>


    <h2 class="ui header">Results</h2>
    <component v-for="result in results" :is="result._type" :result="result" @apply-filter="applyFilter"></component>
    <!-- <img src="./assets/logo.png"> -->
    <!-- <hello></hello> -->
  </div>
</template>

<script>
import inflection from 'inflection';
import Vue from 'vue';
import _ from 'lodash';
import Events from './components/Events';
import Clients from './components/Clients';
import Countries from './components/Countries';
import Tasks from './components/Tasks';

export default {
  name: 'app',

  components: {
    Events,
    Clients,
    Countries,
    Tasks,
  },

  data() {
    return {
      search: '',
      results: [],
      filters: [],
      user: {},
      aggs: {},
    };
  },

  created() {
    Vue.http.headers.common.Authorization = `Bearer ${localStorage.getItem('jwt')}`;

    this.$http.get('//gateway.croudcontrol.dev/api/user/me').then((response) => {
      this.user = response.body.data;
    });
  },

  methods: {
    applyTypeFilter(type) {
      this.filters.push({
        label: type,
        filter: `_type:${type}`,
        color: 'blue',
      });
    },

    applyStatusFilter(status) {
      this.filters.push({
        label: status,
        filter: `status:${status}`,
        color: 'yellow',
      });
    },

    applyFilter(filter) {
      this.filters.push(filter);
    },

    removeFilter(filter) {
      this.filters.splice(this.filters.indexOf(filter), 1);
    },
  },

  computed: {
    types() {
      if (!this.aggs.types) return [];
      return this.aggs.types.buckets;
    },

    statuses() {
      if (!this.aggs.statuses) return [];
      return this.aggs.statuses.buckets;
    },

    finalSearch() {
      return `${this.filters.map(filter => filter.filter).join(' AND ')} ${this.filters.length && this.search ? 'AND' : ''} ${this.search}`;
    },
  },

  filters: {
    singularize(str) {
      return inflection.singularize(str);
    },
  },

  watch: {
    finalSearch: _.debounce(function () {
      this.$http.get(`//gateway.croudcontrol.dev/api/search?q=${this.finalSearch}`).then((response) => {
        this.results = response.body.message.data.hits.hits;
        this.aggs = response.body.message.data.aggregations;
      });
    }, 500),
  },
};
</script>
