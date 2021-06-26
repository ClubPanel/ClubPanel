import {RenderProps} from "../../pages/[[...name]]";
import {Module} from "./module";

export interface ClientSide extends Module {
  register?: RegisterClientSideType;
  configs?: string[];
  events?: ClientSideEvents;
}

export type ClientRegisterCallback = (path: string, props: object, component?: string) => void;

export type RegisterClientSideType = (callback: ClientRegisterCallback) => void;

export interface ClientSideEvents {
  preRender?: PreRenderType;
  render?: RenderType;
}

export type PreRenderType = (props: { props: RenderProps }) => void;
export type RenderType = (props: RenderProps) => void;