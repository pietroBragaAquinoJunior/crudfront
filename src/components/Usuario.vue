<template>
  <n-card title="Usuários" class="padding card__transparente">
    <n-form
        ref="formRef"
        inline
        :label-width="80"
        :model="formValue"
        :rules="rules"
    >
      <n-form-item path="user.nome" >
        <n-input v-model:value="formValue.usuario.nome" class="form__item" placeholder="Nome"/>
      </n-form-item>
      <n-form-item path="user.email">
        <n-input v-model:value="formValue.usuario.email" class="form__item" placeholder="Email"/>
      </n-form-item>
      <n-form-item path="user.número">
        <n-input v-model:value="formValue.usuario.telefone" class="form__item" placeholder="Telefone"/>
      </n-form-item>
      <n-form-item>
        <n-button class="botao" @click="handleValidateClick">
          Enviar
        </n-button>
      </n-form-item>
    </n-form>
    <n-data-table
        class="tabela"
        :columns="columns"
        :data="data.info"
        :pagination="pagination"
        :bordered="false"
    />
  </n-card>
</template>

<script setup lang="ts">
// Script Fomulário
import {h, onBeforeMount, reactive, ref} from "vue";
import Usuario from "../types/Usuario";
import DataService from "../service/DataService";
import {NButton, useMessage, DataTableColumns, NIcon, MenuProps} from 'naive-ui'
import {FormInst} from 'naive-ui'


const formRef = ref<FormInst | null>(null)
const message = useMessage()
const formValue = ref({
  usuario: {
    nome: '',
    email: '',
    telefone: '',
  }
})
const rules = {
  usuario: {
    nome: {
      required: true,
      message: 'Por favor, insira o seu nome.',
    },
    email: {
      required: true,
      message: 'Por favor, insira o seu email.',
    },
    telefone: {
      required: true,
      message: 'Por favor insira o seu telefone.',
    }
  },
}
const handleValidateClick = async (e: MouseEvent) => {
  await DataService.salvarUsuario(formValue.value.usuario.nome, formValue.value.usuario.email, formValue.value.usuario.telefone);
  await atualizarTabela();
}

// Script Customização Menu
// type MenuThemeOverrides = NonNullable<MenuProps['themeOverrides']>
// const menuThemeOverrides: MenuThemeOverrides = {
//   itemTextColor: "red",
//   itemTextColorActive: "red",
//   itemTextColorHover: "red",
//   itemColorHover: "red",
//   itemColorActive: "red",
//   itemIconColor: "red",
//   itemIconColorHover: "red",
//   itemIconColorActive: "red",
//   itemColorActiveCollapsed: "red",
//   itemColorActiveHover: "red",
//   itemTextColorActiveHover: "red",
// }

// Script Tabela
const createColumns = ({play}: {
  play: (row: Usuario) => void
}): DataTableColumns<Usuario> => {
  return [
    {
      title: 'Identificador',
      key: 'id'
    },
    {
      title: 'nome',
      key: 'nome'
    },
    {
      title: 'Email',
      key: 'email'
    },
    {
      title: 'Telefone',
      key: 'telefone'
    },
    {
      title: 'Ação',
      key: 'acao',
      render(row) {
        return h(
            NButton,
            {
              strong: true,
              size: 'medium',
              onClick: () => play(row)
            },
            {default: () => 'Deletar'}
        )
      }
    }
  ]
}

let data = reactive({info: []});


const columns = createColumns({
  play(row: Usuario) {
    deletarUsuario(row.id);
  }
})
const pagination = false as const

const deletarUsuario = async (id: string) => {
  await DataService.deletarUsuario(id).then((response: any) => {
  }).catch((e: Error) => {
    console.log("teste")
  });
  await atualizarTabela();
}

const atualizarTabela = async () => {
  DataService.listarUsuario().then((response: any) => {
    data.info = response.data
    console.log(data.info)
  }).catch((e: Error) => {
    console.log("teste")
  });
}

onBeforeMount(() => {
  atualizarTabela();
})
</script>

<style scoped>

.card__transparente{
  background: rgba(255,255,255,0.8);
  border-radius: 25px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.padding{
  padding: 20px;
}

.botao{
  background: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.form__item{
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.tabela{
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

</style>