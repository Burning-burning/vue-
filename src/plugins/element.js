import Vue from 'vue'
import {
  Button,
  Form,
  FormItem,
  Input,
  Message,
  Checkbox,
  Menu,
  Submenu,
  MenuItem,
  Table,
  TableColumn,
  MessageBox,
  Drawer,
  Image,
  Select,
  Option,
  Upload,
  Pagination,
  Dialog,
  Tag,
  DatePicker
} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Checkbox)
Vue.use(Menu)
Vue.use(Image)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Drawer)
Vue.use(Select)
Vue.use(Option)
Vue.use(Upload)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(DatePicker)
Vue.prototype.$message = Message

Vue.prototype.$confirm = MessageBox.confirm
