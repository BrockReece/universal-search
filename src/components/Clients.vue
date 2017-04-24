<template>
    <div class="ui segments">
        <div class="ui basic segment" @click="showOptions = !showOptions">
            <h4 class="ui heading">
                {{ result._source.name }}
                <small class="ui blue label">{{ result._type | singularize }}</small>
            </h4>
            <p>{{ result._source.email }}</p>
        </div>
        <div v-if="showOptions" class="ui basic secondary segment">
            <div class="ui text menu">
                <div class="item">
                    <i class="view icon"></i>
                    View Client
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
