import React, { createContext, useState, useContext, Dispatch, SetStateAction } from 'react';
import { YtelseSammendrag } from '../../util/helseSpionTypes';

interface YtelseSammendragProps {
  children: React.ReactNode
  ytelseSammendrag?: YtelseSammendrag[] | undefined
}

interface YtelsesammendragProps {
  ytelsesammendrag: YtelseSammendrag[] | undefined,
  setYtelsesammendrag: Dispatch<SetStateAction<YtelseSammendrag[] | undefined>>,
}

const YtelseSammendragContext = createContext<YtelsesammendragProps>({
  ytelsesammendrag: [],
  setYtelsesammendrag: () => {}
});

const YtelseSammendragProvider = (props: YtelseSammendragProps) => {
  const [ ytelsesammendrag, setYtelsesammendrag ] = useState<YtelseSammendrag[] | undefined>(props.ytelseSammendrag);

  return (<YtelseSammendragContext.Provider value={{ ytelsesammendrag, setYtelsesammendrag }}>{ props.children }</YtelseSammendragContext.Provider>);
};

export default YtelseSammendragProvider;

export const useYtelseSammendragContext = () => useContext(YtelseSammendragContext);
