export interface Module {
  priority?: number;
}

export interface ConfigHandler {
  register: () => void;
}