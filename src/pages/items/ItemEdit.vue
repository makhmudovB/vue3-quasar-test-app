<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useItemsStore } from 'stores/items';

const options = ['Фронтенд', 'Бэкенд', 'UI Дизайнер', 'DevOps', 'Проектный менеджер'];

const props = defineProps<{ id: string }>();
const store = useItemsStore();
const router = useRouter();

const form = reactive({
  fullName: '',
  birthDate: '',
  profession: '',
  docNumber: '',
  phoneNumber: '',
});

onMounted(async () => {
  const item = store.getById(Number(props.id));
  if (!item) {
    await router.push('/items');
    return;
  }
  Object.assign(form, {
    fullName: item.fullName,
    birthDate: item.birthDate,
    profession: item.profession,
    docNumber: item.docNumber,
    phoneNumber: item.phoneNumber,
  });
});

async function submit() {
  store.update(Number(props.id), form);
  await router.push('/items');
}
</script>

<template>
  <q-page padding>
    <div class="text-h6 q-mb-md">Редактирование пользователя</div>

    <q-form @submit.prevent="submit">
      <q-input
        v-model="form.fullName"
        label="Ф.И.О."
        clearable
        outlined
        lazy-rules
        :rules="[(v) => !!v || 'Обязательное поле']"
      />
      <q-input
        v-model="form.birthDate"
        type="date"
        label="Дата рождения"
        outlined
        clearable
        lazy-rules
        :rules="[(v) => !!v || 'Обязательное поле']"
      />
      <q-select
        outlined
        v-model="form.profession"
        :options="options"
        clearable
        label="Профессия"
        lazy-rules
        :rules="[(v) => !!v || 'Обязательное поле']"
      />
      <q-input
        v-model="form.docNumber"
        label="Номер документа"
        outlined
        clearable
        lazy-rules
        :rules="[(v) => !!v || 'Обязательное поле']"
      />
      <q-input
        v-model="form.phoneNumber"
        label="Номер телефона"
        outlined
        mask="+998 (##) ###-##-##"
        fill-mask
      />

      <q-btn type="submit" color="primary" label="Редактировать" class="q-mt-md" />
    </q-form>
  </q-page>
</template>
