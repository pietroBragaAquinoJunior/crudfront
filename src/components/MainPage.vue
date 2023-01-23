<template>
  <div class="centralizar">
    <n-card class="card__transparente margin__bottom centralizar pequeno" >
      <n-menu style="font-weight: bold; font-size: 15px" icon-size="30" v-model:value="activeKey" mode="horizontal" :options="menuOptions"/>
    </n-card>
    <Funcionario/>
  </div>
</template>

<script setup lang="ts">

// Imports
import {h} from 'vue'

import {NIcon} from 'naive-ui'

import {ref, Component} from 'vue'
import type {MenuOption} from 'naive-ui'
import {PeopleCircleOutline, BarbellOutline, ClipboardOutline} from '@vicons/ionicons5'
import Usuario from "./Usuario.vue";
import Funcionario from "./Funcionario.vue";

// Script Menu
function renderIcon(icon: Component) {
  return () => h(NIcon, null, {default: () => h(icon)})
}

const menuOptions: MenuOption[] = [
  {
    label: 'Usuários',
    key: 'usuarios',
    icon: renderIcon(PeopleCircleOutline)
  },
  {
    label: 'Funcionários',
    key: 'funcionarios',
    icon: renderIcon(ClipboardOutline),
  },
  {
    label: 'Planos',
    key: 'planos',
    icon: renderIcon(BarbellOutline),
  }
]
const activeKey = ref<string | null>(null)

</script>

<style scoped>

.margin__bottom{
  margin-bottom: 200px;
}

.pequeno{
  width: 35rem;
}

.centralizar {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card__transparente{
  background: rgba(255,255,255,0.8);
  border-radius: 25px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

</style>