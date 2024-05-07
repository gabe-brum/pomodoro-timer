import { HandPalm, Play } from "phosphor-react"
import { FormProvider, useForm } from "react-hook-form";
import { HomeContainer, InterruptCountdownButton, StartCountdownButton } from "./styles"
import { NewCycleForm } from "./components/NewCycleForm"
import { Countdown } from "./components/Countdown"
import { zodResolver } from "@hookform/resolvers/zod" // usado para definir os campos presentes no formulário e seus respectivos tratamentos
import * as zod from 'zod' // biblioteca para validações do formulário
import { useContext } from "react";
import { CyclesContext } from "../../contexts/CyclesContext";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'informe a tarefa'),
  minutesAmount: zod.number()
  .min(5, 'O cliclo precisa ser de no mínimo 5 minutos')
  .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle  } = useContext(CyclesContext)

  const newCycleForm = useForm<NewCycleFormData>({ 
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  })
  const { reset, handleSubmit, watch } = newCycleForm
  const task = watch('task')
  const isSubmitDisabled = !task

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
    reset()
  }

  function renderButton() {
    if (activeCycle) {
      return (
        <InterruptCountdownButton onClick={interruptCurrentCycle} type="button">
          <HandPalm size={24}/> 
          Interromper
        </InterruptCountdownButton>
      )
    }

    return (
      <StartCountdownButton disabled={isSubmitDisabled} type="submit">
        <Play size={24}/> 
        Começar
      </StartCountdownButton>
    )
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm} >
          <NewCycleForm />
        </FormProvider>
        <Countdown />
        {renderButton()}
      </form>
    </HomeContainer>
  )
}