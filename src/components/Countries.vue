<template>
    <div class="ui segments">
        <div class="ui basic yellow segment" @click="showOptions = !showOptions">
            <h4 class="ui heading">
                <i class="ui flag" :class="{[result._source.code.toLowerCase()]: true }"></i>
                {{ result._source.name }}
                <small class="ui blue label">{{ result._type | singularize }}</small>
                <small class="ui yellow label">{{ result._source.status }}</small>
            </h4>
        </div>
        <div v-if="showOptions" class="ui basic secondary segment">
            <div class="ui text menu">
                <div class="item">
                    <i class="view icon"></i>
                    View Event
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
  };
</script>
