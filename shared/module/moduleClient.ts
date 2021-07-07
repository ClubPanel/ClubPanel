import {RenderProps} from "../../pages/[[...name]]";
import {Module} from "./module";

/**
 * The base interface for doing things client-side.
 */
export interface ClientSide extends Module {
  /**
   * A method called when pages should be registered, providing a callback to register pages as an argument.
   */
  register?: RegisterClientSideType;
  configs?: string[];
  /**
   * An interface allowing the module to register for events.
   */
  events?: ClientSideEvents;
}

/**
 * The callback function used to register a page.
 * @param path {string} - is the location of the page in the browser.
 * @param props {object} - is an object of props that will be passed to the page's render method.
 * @param component {string} - is an optional path to the component that defines everything on the page. This path is relative to the root of the module directory.
 */
export type ClientRegisterCallback = (path: string, props: object, component?: string) => void;

/**
 * The function that will be ran to register pages.
 * @param callback {ClientRegisterCallback} - is a function that can be used to register a page.
 */
export type RegisterClientSideType = (callback: ClientRegisterCallback) => void;

/**
 * An interface allowing modules to listen to client-events.
 */
export interface ClientSideEvents {
  /**
   * An event called before the page's render method is called, on getServerSideProps.
   */
  preRender?: PreRenderType;
  /**
   * An event called when the page's render method is called.
   */
  render?: RenderType;
}

/**
 * An event called before the page's render method is called, on getServerSideProps.
 * @param props {props: RenderProps} - is an object that can be used to modify the page's render props, or create redirects/send http codes.
 */
export type PreRenderType = (props: { props: RenderProps }) => void;
/**
 * An event called when the page's render method is called.
 * @param props {RenderProps} - is the render props send to the render method.
 */
export type RenderType = (props: RenderProps) => void;