import Immutable from 'immutable'
import { MenuList } from '../Action/Index'
import { System } from '../../Libs/Config'

import {
  SIDE_BAR_TOGGLE,
  MENU_CHANGE,
  SET_FILTERS,
  SELECT_FILTER,
  SET_TOOLBAR,
  SETTING_TOGGLE,
  SET_INDEX_SCROLL_POS,
  SET_TAG_SCROLL_POS,
  SHOW_MESSAGE,
  HIDE_MESSAGE,
  SET_CONFIRM_DIALOG,
  CLOSE_CONFIRM_DIALOG
} from '../Action/Index'

import {
  GET_DATA_START,
  GET_DATA_SUCCESS,
  GET_DATA_FAIL,
  REQUEST_POSTS,
  RECEIVE_POSTS,
  ERROR_POSTS
} from '../Action/Data'

export function indexScrollPos(state = 0, action) {
  switch (action.type) {
    case SET_INDEX_SCROLL_POS:
      return action.pos;
    default:
      return state;
  }
}

export function tagScrollPos(state = 0, action) {
  switch (action.type) {
    case SET_TAG_SCROLL_POS:
      return action.pos;
    default:
      return state;
  }
}

export function sideBarToggle(state = (System ? true : false), action) {
  switch (action.type) {
    case SIDE_BAR_TOGGLE:
      return !state;
    default:
      return state;
  }
}

export function messageInfo(state = { type: 'info', text: ''}, action) {
  switch (action.type) {
    case SHOW_MESSAGE:
      return action.info;
    case HIDE_MESSAGE:
      return { type: 'info', text: ''};
    default:
      return state;
  }
}

export function confirmInfo(state = { title: '' }, action) {
  switch (action.type) {
    case SET_CONFIRM_DIALOG:
      return action.info;
    case CLOSE_CONFIRM_DIALOG:
      return { title: '' };
    default:
      return state;
  }
}

export function settingStatus(state = false, action) {
  switch (action.type) {
    case SETTING_TOGGLE:
      return !state;
    default:
      return state;
  }
}

export function menuStatus(state = MenuList, action) {
  switch (action.type) {
    case MENU_CHANGE:
      return state.map((menu, index) => {
        return Object.assign({}, menu, {
          active: action.index === menu.key
        })
      });
    default:
      return state;
  }
}

export function currentFilters(state = [], action) {
  switch (action.type) {
    case SET_FILTERS:
      return [...action.filters];
    case SELECT_FILTER:
      return state.map((filter, index) => {
        return Object.assign({}, filter, {
          on: filter.index === action.index
        })
      });
    default:
      return state;
  }
}

export function currentToolBar(state = [], action) {
  switch (action.type) {
    case SET_TOOLBAR:
      return [...action.toolBar];
    default:
      return state;
  }
}

export function requestDatas(state = { fetchStat: 0 }, action) {
  switch (action.type) {
    case GET_DATA_START:
      state.fetchStat = 1;
      state[action.name] = state[action.name] || [];
      return state;
    case GET_DATA_SUCCESS:
      if (action.list.length > 0 && (action.page * 20 + action.list.length) < action.total) {
        state.fetchStat = 0;
      } else {
        state.fetchStat = 2;
      }
      state[action.name] = action.list;
      action.success(action.list);
      return state;
    case GET_DATA_FAIL:
      state.fetchStat = 0;
      return state;
    default:
      return state;
  }
}

const defaultPost = Immutable.fromJS({ data: {}, isFetching: false });

export function postDatas(state = defaultPost, action = {}) {
  switch (action.type) {
    case REQUEST_POSTS:
      return state.set('isFetching', true);
    case RECEIVE_POSTS:
      return Immutable.Map({ 'data': action.json, 'isFetching': false });
    default:
      return state;
  }
}
