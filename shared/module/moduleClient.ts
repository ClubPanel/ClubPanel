import {RenderProps} from "../../pages/[[...name]]";
import {Module} from "./module";

export interface ClientSide extends Module {
  register?: (callback: ClientRegisterCallback) => void;
  configs?: string[];
  events?: ClientSideEvents;
}

export interface ClientSideEvents {
  preRender?: (props: { props: RenderProps }) => void;
  render?: (props: RenderProps) => void;
}


export type ClientRegisterCallback = (path: string, props: object, component?: string) => void;