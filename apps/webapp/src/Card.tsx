import { Component, ParentComponent, Show } from 'solid-js'

export const Card: ParentComponent<{ heading?: string | Element }> = (props) => {
  return (
    <div class="card">
      <Show when={props.heading != null}>
        <div class="card-heading">
          {props.heading!}
        </div>
      </Show>
      <div class="card-body">{props.children}</div>
    </div>
  )
}