<script setup lang="ts">
import type { ILead } from '../models/ILead.ts';
import Lead from './Lead.vue';

defineProps<{ leads: ILead[] }>();
</script>

<template>
<div class="leadList">
    <div
        v-for="lead in leads"
        :key="lead.id"
    >
        <Lead
            :id="lead.id"
            :responsibleName="lead.responsibleName"
            :created_at="lead.created_at"
            :status="lead.status"
            :name="lead.name"
            :price="lead.price"
            :contact="lead.contact"
            :emailContact="lead.emailContact"
            :telephone="lead.telephone"
        />
    </div>
</div>
</template>

<style scoped>
.leadList {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 90%;
}
</style>