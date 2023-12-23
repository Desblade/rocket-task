<script setup lang="ts">
import {
    DownOutlined,
    MailTwoTone,
    FrownOutlined,
    PhoneTwoTone
} from '@ant-design/icons-vue';
import { h, onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import type { ILead } from '../models/ILead.ts';
import { LeadStatusEnum } from '../utils/enums/leadStatusEnum.ts';

const props = defineProps<ILead>();

const isVisibleContacts: Ref<boolean> = ref(false);
const isVisibleWarning: Ref<boolean> = ref(false);
const warningMessageTitle: Ref<string> = ref('');
const warningMessageDescription: Ref<string> = ref('');
const rootClasses: Ref<string> = ref('');

onMounted(() => {
    switch (props.status) {
        case LeadStatusEnum.FirstContact:
            rootClasses.value = 'firstContact';
            break;
        case LeadStatusEnum.Conversation:
            rootClasses.value = 'conversation';
            break;
        case LeadStatusEnum.MakeADecision:
            rootClasses.value = 'makeADecision';
            break;
        case LeadStatusEnum.Coordination:
            rootClasses.value = 'coordination';
            break;
        case LeadStatusEnum.Successfully:
            rootClasses.value = 'successfully';
            break;
        case LeadStatusEnum.Closed:
            rootClasses.value = 'closed';
            break;
    }
});

const handleShowContacts = (): void => {
    isVisibleContacts.value = !isVisibleContacts.value;
};

const closeWarning = (): void => {
    isVisibleWarning.value = false;
};

const handleSendMail = (e: Event): void => {
    e.stopPropagation()

    if (props.emailContact === 'Неизвестно') {
        warningMessageTitle.value = 'Предупреждение';
        warningMessageDescription.value = 'Почта пользователя неизвестна';
        isVisibleWarning.value = true;
    } else {
        window.location.href = `mailto:${props.emailContact}`;
    }
};

const handleCallContact = (e: Event): void => {
    e.stopPropagation();

    if (props.telephone === 'Неизвестно') {
        warningMessageTitle.value = 'Предупреждение';
        warningMessageDescription.value = 'Телефон пользователя неизвестна';
        isVisibleWarning.value = true;
    }

    window.location.href = `tel:${props.telephone}`;
};

</script>

<template>
    <a-card
        @click="handleShowContacts"
        class="leadCard"
    >
        <template #title>
            <a-space direction="horizontal">
                <a-button
                    class="leadIcon"
                    size="small"
                    value="small"
                    type="primary"
                    shape="circle"
                    :icon="h(DownOutlined)"
                    :class="{ rotate180: isVisibleContacts }"
                />
                <div class="leadName">
                    <a-typography-text>{{ name }}</a-typography-text>
                </div>
                <div class="budget">
                    <a-typography-text>{{ price }}</a-typography-text>
                </div>
                <div class="status">
                    <a-typography-text :class="rootClasses">{{ status }}</a-typography-text>
                </div>
                <div class="status">
                    <a-typography-text>{{ responsibleName }}</a-typography-text>
                </div>
                <div class="status">
                    <a-typography-text>{{ created_at }}</a-typography-text>
                </div>
            </a-space>
        </template>
        <div v-if="isVisibleContacts" class="contacts">
            <div class="contactName">
                <a-typography-text>{{ contact }}</a-typography-text>
            </div>
            <MailTwoTone @click="handleSendMail" class="mailIcon" />
            <PhoneTwoTone @click="handleCallContact" class="mailIcon"/>
        </div>
    </a-card>
    <a-alert
        @click="closeWarning"
        show-icon
        v-if="isVisibleWarning"
        closable
        banner
        class="warningAlert"
        :message="warningMessageTitle"
        :description="warningMessageDescription"
        type="warning"
    >
        <template #icon><FrownOutlined /></template>
    </a-alert>
</template>
<style scoped>
.leadCard {
    width: 100%;
    padding-right: 60px;
    transition: transform 0.5s
}

.leadCard:hover {
    transform: scale(1.05);
}

.rotate180 {
    transform: rotate(180deg);
    transition: transform 0.5s;
}

.leadName {
    min-width: 250px;
    margin-left: 27px;
}

.budget {
    min-width: 150px;
}

.status {
    min-width: 300px;
}

.contacts {
    display: flex;
    align-items: center;
    gap: 20px;
}

.mailIcon {
    font-size: 18px;
}

.warningAlert {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 600px;
}

.firstContact {
    background: rgba(48, 139, 182, 0.8);
    padding: 4px;
}

.conversation {
    background: rgba(183, 219, 18, 0.8);
    padding: 4px;
}

.makeADecision {
    background: rgba(219, 154, 18, 0.8);
    padding: 4px;
}

.coordination {
    background: rgba(136, 34, 150, 0.8);
    padding: 4px;
}

.successfully {
    background: rgba(36, 152, 64, 0.8);
    padding: 4px;
}

.closed {
    background: rgba(121, 134, 124, 0.8);
    padding: 4px;
}

</style>