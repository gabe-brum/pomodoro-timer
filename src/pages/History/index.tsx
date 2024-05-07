import { useContext } from "react"
import { CyclesContext } from "../../contexts/CyclesContext"
import { HistoryContainer, HistoryList, Status } from "./styles"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Cycle } from "../../reducers/cycles/reducer"

export function History() {
  const { cycles } = useContext(CyclesContext)

  function renderCycleStatus(cycle: Cycle) {
    if (cycle.finishedDate) {
      return (
        <Status statusColor="green">Concluído</Status>
      )
    } else if (cycle.interruptedDate) {
      return  <Status statusColor="red">Interrompido</Status>
    } else {
      return  <Status statusColor="yellow">Em andamento</Status>
    }
  }

  function renderCycles() {
    if (cycles.length === 0) return null

    return cycles.map((cycle) => {
      const { id, task, minutesAmount, startDate } = cycle

      return (
        <tr key={id}>
          <td>
            {task}
          </td>
          <td>
            {minutesAmount} minutos
          </td>
          <td>
            {formatDistanceToNow(new Date(startDate), { addSuffix: true, locale: ptBR })}
          </td>
          <td>
            {renderCycleStatus(cycle)}
          </td>
        </tr>
      )
    })
  }

  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {renderCycles()}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}
