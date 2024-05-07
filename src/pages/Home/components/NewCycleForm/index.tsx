import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { useContext } from "react";
import { CyclesContext } from "../../../../contexts/CyclesContext";
import { useFormContext } from "react-hook-form";

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

  return (
    <FormContainer>
    <label htmlFor="task">Vou trabalhar em</label>
    <TaskInput
      type="text"
      list="task-suggestions"
      id="task" 
      placeholder="Dê um nome para seu projeto"
      {...register('task')}
      disabled={!!activeCycle}
    />
    <datalist id="task-suggestions">
      <option value="Projeto 1" />
      <option value="Projeto 2" />
      <option value="Projeto 3" />
    </datalist>
    <label htmlFor="minutesAmount">durante</label>
    <MinutesAmountInput 
      maxLength={2} 
      min={5} 
      max={60} 
      step={5} 
      type="number"
      id="minutesAmount"
      placeholder="00"
      {...register('minutesAmount', { valueAsNumber: true })}
      disabled={!!activeCycle}
    />
    <span>minutos.</span>  
  </FormContainer>
  )
}