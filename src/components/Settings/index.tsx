import { useState } from "react";
import useSettings from "~/store/modules/settings";

import Modal from "../Modal";
import { Checkbox, Content, Slider } from "./styles";

const SCALE_RATIO = 0.5;

interface ISettingsProps {
  dismiss: () => void;
}

const Settings = ({ dismiss }: ISettingsProps) => {
  const { settings, updateSettings } = useSettings();
  const [volumeSfx, setVolumeSfx] = useState(
    Math.floor((settings.volume.soundEffects / SCALE_RATIO) * 100)
  );
  const [keyboardHidden, setKeyboardHidden] = useState(settings.keyboardHidden);

  const scale = (number: number) => {
    return (number * SCALE_RATIO) / 100;
  };

  const onChangeVolume = (e) => {
    setVolumeSfx(e.target.value);
  };

  const toggleKeyboard = () => {
    setKeyboardHidden(!keyboardHidden);
  };

  const onSubmit = () => {
    updateSettings({
      volume: {
        ...settings.volume,
        soundEffects: scale(volumeSfx),
      },
      keyboardHidden,
    });

    dismiss();
  };

  return (
    <Modal dismiss={onSubmit} title="Configurações">
      <Content>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="volumeSfx">
                  Volume dos efeitos sonoros: {volumeSfx}
                </label>
              </td>
              <td>
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
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="hiddenKeyboard">
                  Teclado oculto por padrão
                </label>
              </td>
              <td>
                <Checkbox
                  id="hiddenKeyboard"
                  checked={keyboardHidden}
                  onChange={toggleKeyboard}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </Content>
    </Modal>
  );
};

export default Settings;
