<script setup lang="ts">
import { onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { useItemsStore } from 'src/stores/items';

const store = useItemsStore();
const $q = useQuasar();

onMounted(async () => {
  await store.load();
});

function confirmDelete(id: number) {
  $q.dialog({
    title: 'Delete item',
    message: 'Are you sure you want to delete this item?',
    cancel: true,
    persistent: true,
    ok: {
      label: 'Delete',
      color: 'red-7',
    },
  }).onOk(() => {
    store.remove(id);
  });
}
</script>

<template>
  <q-page padding>
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h6">Список пользователей</div>
      <q-btn
        color="primary"
        label="Содать пользователя"
        to="/items/create"
        :disable="store.loading"
      />
    </div>

    <div v-if="store.loading">
      <q-skeleton type="rect" height="40px" class="q-mb-sm" />
      <q-skeleton type="rect" height="40px" class="q-mb-sm" />
      <q-skeleton type="rect" height="40px" class="q-mb-sm" />
      <q-skeleton type="rect" height="40px" />
    </div>

    <q-table
      :rows="store.paginatedItems"
      row-key="id"
      rows-per-page-label="Кол-во в странице"
      :columns="[
        { name: 'fullName', label: 'Ф.И.О.', field: 'fullName', align: 'left' },
        { name: 'birthDate', label: 'Дата рождения', field: 'birthDate', align: 'left' },
        { name: 'profession', label: 'Профессия', field: 'profession', align: 'left' },
        { name: 'docNumber', label: 'Номер документа', field: 'docNumber', align: 'left' },
        { name: 'phoneNumber', label: 'Номер телефона', field: 'phoneNumber', align: 'left' },
        { name: 'actions', label: 'Действия', field: () => null, align: 'right' },
      ]"
    >
      <template #body-cell-actions="props">
        <q-td align="right">
          <q-btn
            dense
            color="primary"
            icon="edit"
            :to="`/items/${props.row.id}/edit`"
            class="q-mr-sm"
          />
          <q-btn dense color="red-6" icon="delete" @click="confirmDelete(props.row.id)" />
        </q-td>
      </template>
    </q-table>

    <div v-if="store.paginatedItems.length" class="row items-center justify-between q-mt-md">
      <q-pagination v-model="store.page" :max="store.totalPages" />

      <q-select
        :model-value="store.rowsPerPage"
        :options="[5, 10, 20]"
        dense
        outlined
        label="Кол-во в странице"
        style="width: 160px"
        @update:model-value="store.setRowsPerPage"
      />
    </div>
  </q-page>
</template>
