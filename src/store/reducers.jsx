import {
  LOG_IN_USER,
  HANDLE_USER_EXIT,
  LOAD_STATE,
  HANDLE_SORT_DIRECTION,
  HANDLE_CHANGE_SEARCH,
  HANDLE_CHOOSE_SEARCH,
  HANDLE_OPEN_INFO,
  HANDLE_CHANGE_FILTER_AMOUNT_MIN,
  HANDLE_CHANGE_FILTER_AMOUNT_MAX,
  HANDLE_CHANGE_FILTER_STATUS,
  HANDLE_CHANGE_FILTER_DATE_MIN,
  HANDLE_CHANGE_FILTER_DATE_MAX,
  HANDLE_NEW_PAYMENT,
  HANDLE_CREATE_PAYMENT,
  HANDLE_CANCEL_PAYMENT,
} from './constants';

const initialState = {
  isAuthorized: false,

  email: '',
  balance: 0,

  paylist: [],

  isOpenNew: false,
  isOpenSearch: false,
  search: [],

  sortList: [
    { name: 'Наименование', direction: true },
    { name: 'Сумма', direction: true },
    { name: 'Дата', direction: true },
    { name: 'Статус', direction: true },
    { name: 'Получатель', direction: true },
  ],

  isOpenInfo: false,
  infoCard: [],

  filterDate: {
    arrDate: [],
    min: 0,
    max: 0,
  },
  filterAmount: {
    arrAmount: [],
    min: 0,
    max: 0,
  },
  filterStatus: 'Показать все',
};

export default (state = initialState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case LOG_IN_USER:
      return {
        ...state,
        isAuthorized: true,
      };
    case HANDLE_USER_EXIT:
      return {
        ...state,
        isAuthorized: false,
        email: '',
        balance: 0,
        paylist: [],
      };
    case LOAD_STATE:
      return {
        ...state,
        paylist: payload.paylist,
        email: payload.email,
        balance: payload.balance,
        filterAmount: {
          ...state.filterAmount,
          arrAmount: payload.arrAmount,
          min: payload.arrAmount[0],
          max: payload.arrAmount[payload.arrAmount.length - 1],
        },
        filterDate: {
          ...state.filterDate,
          arrDate: payload.arrDate,
          min: payload.arrDate[0],
          max: payload.arrDate[payload.arrDate.length - 1],
        },
      };

    case HANDLE_CHOOSE_SEARCH:
      return {
        ...state,
        isOpenSearch: false,
      };
    case HANDLE_CHANGE_SEARCH:
      const arrSearch = [];
      state.paylist.forEach(item => {
        let result = 0;
        if (item.name.toLowerCase().indexOf(payload) !== -1) result++;
        if (String(item.amount).indexOf(payload) !== -1) result++;
        if (item.date.indexOf(payload) !== -1) result++;
        if (item.status.toLowerCase().indexOf(payload) !== -1) result++;
        if (item.details.receiver.toLowerCase().indexOf(payload) !== -1)
          result++;
        if (result !== 0) arrSearch.push(item);
      });
      return {
        ...state,
        isOpenSearch: payload !== '' ? true : false,
        search: arrSearch,
      };
    case HANDLE_OPEN_INFO:
      const infoCard = state.paylist.filter(item => item.id === payload.id);
      return {
        ...state,
        isOpenInfo: payload.isOpen,
        infoCard: infoCard[0],
      };
    case HANDLE_CHANGE_FILTER_AMOUNT_MIN:
      return {
        ...state,
        filterAmount: { ...state.filterAmount, min: payload },
      };
    case HANDLE_CHANGE_FILTER_AMOUNT_MAX:
      return {
        ...state,
        filterAmount: { ...state.filterAmount, max: payload },
      };
    case HANDLE_CHANGE_FILTER_STATUS:
      return { ...state, filterStatus: payload };
    case HANDLE_CHANGE_FILTER_DATE_MIN:
      return {
        ...state,
        filterDate: { ...state.filterDate, min: payload },
      };
    case HANDLE_CHANGE_FILTER_DATE_MAX:
      return {
        ...state,
        filterDate: { ...state.filterDate, max: payload },
      };
    case HANDLE_NEW_PAYMENT:
      return { ...state, isOpenNew: true };
    case HANDLE_CREATE_PAYMENT:
      return { ...state, isOpenNew: false };
    case HANDLE_CANCEL_PAYMENT:
      return { ...state, isOpenNew: false };
    case HANDLE_SORT_DIRECTION:
      let paylist = [];
      switch (payload) {
        case 0:
          paylist = state.paylist.sort((a, b) => {
            const x = a.name.toLowerCase();
            const y = b.name.toLowerCase();
            return state.sortList[0].direction
              ? x < y
                ? -1
                : x > y
                ? 1
                : 0
              : x > y
              ? -1
              : x < y
              ? 1
              : 0;
          });
          break;
        case 1:
          paylist = state.paylist.sort((a, b) => {
            return state.sortList[1].direction
              ? a.amount - b.amount
              : b.amount - a.amount;
          });
          break;
        case 2:
          paylist = state.paylist.sort((a, b) => {
            const x = new Date(a.date).getTime();
            const y = new Date(b.date).getTime();
            return state.sortList[2].direction ? x - y : y - x;
          });
          break;
        case 3:
          paylist = state.paylist.sort((a, b) => {
            const x = a.status.toLowerCase();
            const y = b.status.toLowerCase();
            return state.sortList[3].direction
              ? x < y
                ? -1
                : x > y
                ? 1
                : 0
              : x > y
              ? -1
              : x < y
              ? 1
              : 0;
          });
          break;
        case 4:
          paylist = state.paylist.sort((a, b) => {
            const x = a.details.receiver.toLowerCase();
            const y = b.details.receiver.toLowerCase();
            return state.sortList[4].direction
              ? x < y
                ? -1
                : x > y
                ? 1
                : 0
              : x > y
              ? -1
              : x < y
              ? 1
              : 0;
          });
          break;

        default:
          return state;
      }
      return {
        ...state,
        sortList: state.sortList.map((item, key) => {
          return key === payload
            ? { ...item, direction: !item.direction }
            : item;
        }),
        paylist,
      };

    default:
      return state;
  }
};
