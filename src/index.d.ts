
import { Middleware, Dispatch, Action } from 'redux'

export type OnActionCallback = (action: Action, dispatch: Dispatch, getState: () => any) => any

export default function createOnActionMiddleware(): {
    middleware: Middleware
    onAction: <TAction extends string>(action: TAction, callback: OnActionCallback) => void
}