<template>
  <div>
    <v-text-field
      v-bind="$attrs"
      :model-value="date.humanFormat()"
      :readonly="true"
      @click="dialog.toggle()"
    />

    <v-dialog
      v-model="dialog.visible"
      max-width="350"
      @update:modelValue="
        () => {
          emit('update:modelValue', date.formated());
        }
      "
    >
      <v-card>
        <v-date-picker
          width="100%"
          v-model="date.value"
          :min="props.min"
          :max="props.max"
        >
          <template #actions="bind">
            <v-btn
              text="Limpar"
              @click="
                () => {
                  date.value = null;
                  emit('update:modelValue', null);
                  dialog.hide();
                }
              "
            />
            <v-spacer />
            <v-btn
              text="Alterar"
              class="bg-primary"
              @click="
                () => {
                  emit('update:modelValue', date.formated());
                  dialog.hide();
                }
              "
            />
          </template>
        </v-date-picker>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import dayjs from "dayjs";

const props = defineProps({
  modelValue: { type: [String, Object], default: null },
  min: { type: [String, Object], default: null },
  max: { type: [String, Object], default: null },
});

const emit = defineEmits(["update:modelValue"]);

const dialog = useDialog();

const date = reactive({
  value: props.modelValue,
  humanFormat() {
    if (!this.value) return null;
    return dayjs(this.value).format("DD/MM/YYYY");
  },
  formated() {
    if (!this.value) return null;
    return dayjs(this.value).format();
  },
});
</script>
