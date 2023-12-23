<script setup lang="ts">

</script>

<template>
    <a-card class="cardTitle">
        <a-space direction="horizontal">
            <div class="leadName">
                <a-typography-title :level="5">Название</a-typography-title>
            </div>
            <div class="budget">
                <a-typography-title :level="5">Бюджет</a-typography-title>
            </div>
            <div class="status">
                <a-typography-title :level="5">Статус</a-typography-title>
            </div>
            <div class="status">
                <a-typography-title :level="5">Ответственный</a-typography-title>
            </div>
            <div class="status">
                <a-typography-title :level="5">Дата создания</a-typography-title>
            </div>
        </a-space>
    </a-card>
</template>

<style scoped>
.cardTitle {
    width: 90%;
    margin: 25px auto 25px auto;
    padding: 0 60px 0 60px;
    display: flex;
    align-items: flex-end;
}

.leadName {
    min-width: 250px;
}

.budget {
    min-width: 150px;
}

.status {
    min-width: 300px;
}
</style>