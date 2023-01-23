<template>
  <n-card title="Usuários" class="padding card__transparente">
    <n-form
        ref="formRef"
        inline
        :label-width="80"
        :model="formValue"
        :rules="rules"
    >
      <n-form-item path="funcionario.nome" >
        <n-input v-model:value="formValue.funcionario.nome" class="form__item" placeholder="Nome"/>
      </n-form-item>
      <n-form-item path="funcionario.email">
        <n-input v-model:value="formValue.funcionario.email" class="form__item" placeholder="Email"/>
      </n-form-item>
      <n-form-item path="funcionario.telefone">
        <n-input v-model:value="formValue.funcionario.telefone" class="form__item" placeholder="Telefone"/>
      </n-form-item>
      <n-form-item path="funcionario.salario">
        <n-input v-model:value="formValue.funcionario.salario" class="form__item" placeholder="Salario"/>
      </n-form-item>
      <n-form-item path="funcionario.cpf">
        <n-input v-model:value="formValue.funcionario.cpf" class="form__item" placeholder="Cpf"/>
      </n-form-item>
      <n-form-item path="funcionario.horaEntrada">
        <n-input v-model:value="formValue.funcionario.horaEntrada" class="form__item" placeholder="Hora de Entrada"/>
      </n-form-item>
      <n-form-item path="funcionario.horaSaida">
        <n-input v-model:value="formValue.funcionario.horaSaida" class="form__item" placeholder="Hora de Saída"/>
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
import Funcionario from "../types/Funcionario";
import DataService from "../service/DataService";
import {NButton, useMessage, DataTableColumns, NIcon, MenuProps} from 'naive-ui'
import {FormInst} from 'naive-ui'


const formRef = ref<FormInst | null>(null)
const message = useMessage()
const formValue = ref({
  funcionario: {
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    salario: '',
    horaEntrada: '',
    horaSaida: '',
  }
})
const rules = {
  funcionario: {
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
    },
    cpf: {
      required: true,
      message: 'Por favor insira o seu Cpf.',
    },
    salario: {
      required: true,
      message: 'Por favor insira o seu salário.',
    },
    horaEntrada: {
      required: true,
      message: 'Por favor insira sua hora de entrada.',
    },
    horaSaida: {
      required: true,
      message: 'Por favor insira sua hora de saída.',
    }
  },
}
const handleValidateClick = async (e: MouseEvent) => {
  await DataService.salvarFuncinario(formValue.value.funcionario.nome, formValue.value.funcionario.email, formValue.value.funcionario.telefone, formValue.value.funcionario.cpf, formValue.value.funcionario.salario, formValue.value.funcionario.horaEntrada, formValue.value.funcionario.horaSaida);
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
  play: (row: Funcionario) => void
}): DataTableColumns<Funcionario> => {
  return [
    {
      title: 'Identificador',
      key: 'id'
    },
    {
      title: 'Nome',
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
      title: 'Cpf',
      key: 'cpf'
    },
    {
      title: 'Salário',
      key: 'salario'
    },
    {
      title: 'Hora de Entrada',
      key: 'horaEntrada'
    },
    {
      title: 'Hora de Saída',
      key: 'horaSaida'
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
  play(row: Funcionario) {
    deletarFuncionario(row.id);
  }
})
const pagination = false as const

const deletarFuncionario = async (id: string) => {
  await DataService.deletarFuncionario(id).then((response: any) => {
  }).catch((e: Error) => {
    console.log("teste")
  });
  await atualizarTabela();
}

const atualizarTabela = async () => {
  DataService.listarFuncionarios().then((response: any) => {
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