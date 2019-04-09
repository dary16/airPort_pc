import { serialize } from '../../utils';

export default {
  custom: state => serialize(state.custom) || {},
  breadListState: state => serialize(state.breadListState),
  userName: state => state.userInfo.userName || ''
};
