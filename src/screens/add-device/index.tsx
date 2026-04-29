import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ScreenHeader } from '../../components/ScreenHeader';
import { PrivateRoutes } from '../../constants/routes';
import { RootStackParamList } from '../../navigation/types';
import { AddDeviceActions } from './components/AddDeviceActions';
import { AddDeviceIntroCard } from './components/AddDeviceIntroCard';
import { DeviceNameInput } from './components/DeviceNameInput';
import { DeviceNoteInput } from './components/DeviceNoteInput';
import { PairingPreparationCard } from './components/PairingPreparationCard';
import { PairingPreparedNotice } from './components/PairingPreparedNotice';
import { RoomSelector } from './components/RoomSelector';
import { WifiInfoNotice } from './components/WifiInfoNotice';
import { AddDeviceErrors, AddDeviceFormState } from './types';
import { addDeviceClasses } from './styles';

type AddDeviceScreenProps = NativeStackScreenProps<RootStackParamList, typeof PrivateRoutes.ADD_DEVICE>;

const initialState: AddDeviceFormState = {
  name: '',
  note: '',
  room: ''
};

export function AddDeviceScreen({ navigation }: AddDeviceScreenProps) {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState<AddDeviceErrors>({});
  const [isPrepared, setIsPrepared] = useState(false);

  function updateField(field: keyof AddDeviceFormState, value: string) {
    setForm((currentForm) => ({ ...currentForm, [field]: value }));
    setErrors((currentErrors) => ({ ...currentErrors, [field]: undefined }));
    setIsPrepared(false);
  }

  function handleStartPairing() {
    const nextErrors: AddDeviceErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = 'Informe um nome para identificar sua tomada.';
    }

    if (!form.room) {
      nextErrors.room = 'Escolha o ambiente onde a tomada sera usada.';
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      setIsPrepared(false);
      return;
    }

    setIsPrepared(true);
  }

  return (
    <View className="flex-1 bg-[#F9F8FF]">
      <ScreenHeader
        onBack={() => navigation.goBack()}
        subtitle="Vamos configurar sua tomada inteligente"
        title="Adicionar tomada"
      />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1">
        <ScrollView contentContainerClassName={addDeviceClasses.content} showsVerticalScrollIndicator={false}>
          <AddDeviceIntroCard />
          <DeviceNameInput
            error={errors.name}
            onChangeName={(value) => updateField('name', value)}
            value={form.name}
          />
          <RoomSelector
            error={errors.room}
            onSelectRoom={(room) => updateField('room', room)}
            selectedRoom={form.room}
          />
          <DeviceNoteInput
            onChangeNote={(value) => updateField('note', value)}
            value={form.note}
          />
          <PairingPreparationCard />
          <WifiInfoNotice />
          {isPrepared ? <PairingPreparedNotice deviceName={form.name} room={form.room} /> : null}
          <AddDeviceActions onCancel={() => navigation.goBack()} onStartPairing={handleStartPairing} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
