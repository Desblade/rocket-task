<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import { debounce } from 'lodash';
import { FrownOutlined, SearchOutlined } from '@ant-design/icons-vue';
import type { ILead } from '../models/ILead.ts';
import LeadList from '../components/LeadList.vue';
import CardTitle from '../components/CardTitle.vue';
import { fetchLeadsController } from '../http/controllers/LeadController.ts';

const leads: Ref<ILead[]> = ref([]);
const isLoading: Ref<boolean> = ref(false);
const errorMessage: Ref<string> = ref('');
const errorDescription: Ref<string> = ref('');
const isVisibleErrorAlert: Ref<boolean> = ref(false);
const searchValue: Ref<string> = ref('');
const timeToSearchLeads: number = 200;
const searchInput: Ref<HTMLInputElement | null> = ref(null);

onMounted(async () => {
   try {
       isLoading.value = true;

       leads.value = await fetchLeadsController();
   } catch (err: any) {
       isVisibleErrorAlert.value = true;
       errorMessage.value = 'Ошибка';
       errorDescription.value = err.e;
   } finally {
       isLoading.value = false;
   }
});

const closeErrorAlert = (): void => {
    isVisibleErrorAlert.value = false;
};

const handleSearchLeads = async () => {
    try {
        if (searchValue.value.length >= 3 || searchValue.value.length === 0) {
            isLoading.value = true;

            leads.value = await fetchLeadsController(searchValue.value);
        }
    } catch (err: any) {
        isVisibleErrorAlert.value = true;
        errorMessage.value = 'Ошибка';
        errorDescription.value = err.e;
    } finally {
        isLoading.value = false;
        searchInput.value.blur();
    }
};
const handleSearchDebounced = debounce(handleSearchLeads, timeToSearchLeads);
</script>

<template>
<div class="container">
    <div class="wrapper">
        <div class="searchInputContainer">
            <a-input
                ref="searchInput"
                v-model:value="searchValue"
                @input="handleSearchDebounced"
                placeholder="Поиск..."
                style="width: 200px"
            >
                <template #suffix>
                    <SearchOutlined />
                </template>
            </a-input>
        </div>
        <CardTitle />
        <a-spin v-if="isLoading" />
        <LeadList
            v-else
            :leads="leads" />
    </div>
</div>
<a-alert
    v-if="isVisibleErrorAlert"
    @click="closeErrorAlert"
    show-icon
    closable
    banner
    class="errorAlert"
    :message="errorMessage"
    :description="errorDescription"
    type="error"
>
    <template #icon><FrownOutlined /></template>
</a-alert>
</template>

<style scoped>
.container {
    display: flex;
    justify-content: center;
}

.wrapper {
    width: 80%;
    display: flex;
    flex-direction: column;
}

.errorAlert {
    position: absolute;
    right: 20px;
    top: 10px;
    width: 40%;
}

.searchInputContainer {
    display: flex;
    margin-top: 20px;
    width: 95%;
    justify-content: flex-end;
}
</style>