import { useState } from "react";
import useSettings from "~/store/domain/settings";

import Modal from "../Modal";
import { Content, Slider } from "./styles";

const SCALE_RATIO = 1;

interface ISettingsProps {
  dismiss: () => void;
}

const Settings = ({ dismiss }: ISettingsProps) => {
  const { settings, updateSettings } = useSettings();
  const [volumeSfx, setVolumeSfx] = useState(
    Math.floor((settings.volume.soundEffects / SCALE_RATIO) * 100)
  );

  const scale = (number: number) => {
    return (number * SCALE_RATIO) / 100;
  };

  const onChangeVolume = (e) => {
    setVolumeSfx(e.target.value);
  };

  const onSubmit = () => {
    updateSettings({
      volume: {
        ...settings.volume,
        soundEffects: scale(volumeSfx),
      },
    });

    dismiss();
  };

  return (
    <Modal dismiss={dismiss}>
      <Content>
        <h1>Configurações</h1>

        <div>
          <label htmlFor="volumeSfx">Volume dos efeitos sonoros</label>
          <Slider>
            <input
              type="range"
              min="0"
              max="100"
              value={volumeSfx}
              onChange={onChangeVolume}
              id="volumeSfx"
            />
          </Slider>
          <span>{volumeSfx}</span>
        </div>

        <button type="submit" onClick={onSubmit}>
          Salvar
        </button>
      </Content>
    </Modal>
  );
};

export default Settings;
