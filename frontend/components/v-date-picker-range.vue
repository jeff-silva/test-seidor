<template>
  <div>
    <v-row @click="select.dialog = true">
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          label="Data inicial"
          :model-value="propsDateStart"
          :hide-details="true"
          :readonly="true"
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          label="Data final"
          :model-value="propsDateFinal"
          :hide-details="true"
          :readonly="true"
        />
      </v-col>
    </v-row>

    <v-dialog
      v-model="select.dialog"
      :close-on-content-click="false"
      width="350"
    >
      <v-date-picker
        multiple="range"
        width="100%"
        @update:model-value="
          (dates) => {
            if (dates.length <= 1) return;
            select.dateStart = dates.at(0);
            select.dateFinal = dates.at(-1);
          }
        "
      >
        <template #actions="bind">
          <v-btn
            text="Alterar"
            class="bg-primary"
            @click="
              () => {
                emit('update:dateStart', dayjs(select.dateStart).format());
                emit('update:dateFinal', dayjs(select.dateFinal).format());
                select.dialog = false;
              }
            "
          />
        </template>
      </v-date-picker>
    </v-dialog>
  </div>
</template>

<script setup>
import dayjs from "dayjs";

const props = defineProps({
  dateStart: { type: [String, Object], default: null },
  dateFinal: { type: [String, Object], default: null },
});

const emit = defineEmits(["update:dateStart", "update:dateFinal"]);

const propsDateStart = computed(() => {
  if (!props.dateStart) return null;
  return dayjs(props.dateStart).format("DD/MM/YYYY");
});

const propsDateFinal = computed(() => {
  if (!props.dateFinal) return null;
  return dayjs(props.dateFinal).format("DD/MM/YYYY");
});

const select = reactive({
  dialog: false,
  dateStart: props.dateStart,
  dateFinal: props.dateFinal,
});
</script>
