// Core types for the AI App Builder

export interface AppSchema {
  id: string
  name: string
  description: string
  userId: string
  pages: Page[]
  dataModels: DataModel[]
  workflows: Workflow[]
  settings: AppSettings
  createdAt: string
  updatedAt: string
  status: 'draft' | 'published' | 'archived'
  previewImage?: string
}

export interface Page {
  id: string
  name: string
  route: string
  components: Component[]
  layout?: 'default' | 'centered' | 'sidebar'
}

export interface Component {
  id: string
  type: ComponentType
  props: Record<string, any>
  children?: Component[]
  position: { x: number; y: number }
  size: { width: string; height: string }
}

export type ComponentType =
  | 'text'
  | 'heading'
  | 'button'
  | 'input'
  | 'form'
  | 'table'
  | 'card'
  | 'list'
  | 'image'
  | 'container'
  | 'navbar'
  | 'sidebar'
  | 'chart'
  | 'calendar'

export interface DataModel {
  id: string
  name: string
  tableName: string
  fields: Field[]
  relationships?: Relationship[]
}

export interface Field {
  id: string
  name: string
  type: FieldType
  required: boolean
  unique?: boolean
  defaultValue?: any
  validation?: ValidationRule[]
}

export type FieldType =
  | 'text'
  | 'number'
  | 'boolean'
  | 'date'
  | 'datetime'
  | 'email'
  | 'url'
  | 'json'
  | 'uuid'
  | 'reference'

export interface ValidationRule {
  type: 'min' | 'max' | 'pattern' | 'custom'
  value: any
  message: string
}

export interface Relationship {
  id: string
  type: 'oneToMany' | 'manyToOne' | 'manyToMany'
  targetModel: string
  foreignKey: string
}

export interface Workflow {
  id: string
  name: string
  trigger: WorkflowTrigger
  conditions?: WorkflowCondition[]
  actions: WorkflowAction[]
  enabled: boolean
}

export interface WorkflowTrigger {
  type: 'formSubmit' | 'recordCreate' | 'recordUpdate' | 'recordDelete' | 'scheduled' | 'webhook'
  config: Record<string, any>
}

export interface WorkflowCondition {
  field: string
  operator: 'equals' | 'notEquals' | 'contains' | 'greaterThan' | 'lessThan'
  value: any
}

export interface WorkflowAction {
  type: 'createRecord' | 'updateRecord' | 'deleteRecord' | 'sendEmail' | 'callAPI' | 'runCode'
  config: Record<string, any>
}

export interface AppSettings {
  customDomain?: string
  theme: {
    primaryColor: string
    secondaryColor: string
    fontFamily: string
  }
  seo?: {
    title: string
    description: string
    image?: string
  }
}

export interface AICommand {
  id: string
  appId: string
  userId: string
  prompt: string
  intent: AIIntent
  response: AIResponse
  createdAt: string
}

export type AIIntent =
  | 'createPage'
  | 'updateComponent'
  | 'createDataModel'
  | 'createWorkflow'
  | 'updateStyle'
  | 'deleteItem'
  | 'general'

export interface AIResponse {
  success: boolean
  message: string
  changes?: SchemaChange[]
  updatedSchema?: Partial<AppSchema>
}

export interface SchemaChange {
  type: 'page' | 'component' | 'dataModel' | 'workflow'
  action: 'create' | 'update' | 'delete'
  target: string
  changes: Record<string, any>
}

export interface Template {
  id: string
  name: string
  description: string
  category: 'crm' | 'blog' | 'dashboard' | 'task-manager' | 'ecommerce' | 'portfolio'
  previewImage: string
  schema: Omit<AppSchema, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
  featured?: boolean
}

export interface TeamMember {
  id: string
  email: string
  role: 'owner' | 'editor' | 'viewer'
  invitedAt: string
  acceptedAt?: string
}

export interface DeploymentConfig {
  appId: string
  environment: 'preview' | 'production'
  url: string
  status: 'building' | 'ready' | 'failed'
  buildLog?: string[]
  deployedAt?: string
}
