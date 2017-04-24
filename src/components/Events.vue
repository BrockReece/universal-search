<template>
    <div class="ui segments">
        <div class="ui basic yellow segment" @click="showOptions = !showOptions">
            <h4 class="ui heading">
                {{ result._source.name }}
                <small class="ui blue label">{{ result._type | singularize }}</small>
                <small class="ui yellow label">{{ result._source.status }}</small>
                <small v-if="result._source.client" class="ui label">{{ result._source.client }} - {{ result._source.channel_type }}</small>
            </h4>
            <div class="ui list">
                <div class="item">
                    <strong>SuperCroud:</strong>
                    {{ result._source.user_id }}
                </div>
                <div class="item">
                    <strong>Channel Type:</strong>
                    {{ result._source.channel_type }}
                </div>
                <div class="item">
                    <strong>Starts at:</strong>
                    {{ result._source.relevance_date }}
                </div>
            </div>
            <p v-html="result._source.content"></p>
        </div>
        <div v-if="showOptions" class="ui basic secondary segment">
            <div class="ui text menu">
                <div class="item" @click="filter" v-if="result._source.channel_id">
                    <i class="view icon"></i>
                    Filter Channel
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    props: {
      result: {
        required: true,
      },
    },
    data() {
      return {
        showOptions: false,
      };
    },
    methods: {
      filter() {
        /* eslint-disable no-underscore-dangle */
        this.$emit('apply-filter', {
          filter: `channel_id:${this.result._source.channel_id}`,
          label: `${this.result._source.client} - ${this.result._source.channel_type}`,
          color: 'default',
        });
      },
    },
  };
</script>
