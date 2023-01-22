<template>
  <n-data-table
      :columns="columns"
      :data="data.info"
      :pagination="pagination"
      :bordered="false"
  />
</template>

<script setup lang="ts">
import {h, onBeforeMount, reactive} from 'vue'
import {NButton, useMessage, DataTableColumns} from 'naive-ui'
import Usuario from '../types/Usuario'
import DataService from "../service/DataService";




const createColumns = ({play}: {
  play: (row: Usuario) => void
}): DataTableColumns<Usuario> => {
  return [
    {
      title: 'No',
      key: 'id'
    },
    {
      title: 'Title',
      key: 'nome'
    },
    {
      title: 'Length',
      key: 'email'
    },
    {
      title: 'Length',
      key: 'telefone'
    },
    {
      title: 'Action',
      key: 'acao',
      render(row) {
        return h(
            NButton,
            {
              strong: true,
              tertiary: true,
              size: 'small',
              onClick: () => play(row)
            },
            {default: () => 'Play'}
        )
      }
    }
  ]
}

let data = reactive({info: []});

const message = useMessage()

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

onBeforeMount(()=>{
  atualizarTabela();
})




</script>

<style scoped>

</style>