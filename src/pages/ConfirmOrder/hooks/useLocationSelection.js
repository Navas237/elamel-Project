import { useState, useEffect, useMemo } from 'react';
import { contrallSpipping } from '../service/shipping';

export default function useLocationSelection(shippingList) {
    const [selectedGovernorate, setSelectedGovernorate] = useState('');
    const [selectedCenter, setSelectedCenter] = useState('');
    const [selectedArea, setSelectedArea] = useState('');
    const [msarefElchange, setMsarefElchange] = useState('');
    const [longOfCharge, setlongOfCharge] = useState('');

    useEffect(() => {
        if (shippingList && shippingList.length > 0 && selectedGovernorate) {
            const result = contrallSpipping(shippingList, selectedGovernorate, selectedCenter, selectedArea);
            setMsarefElchange(result?.cost ?? 0);
            setlongOfCharge(result?.duration || '');
        } else {
            setMsarefElchange('');
            setlongOfCharge('');
        }
    }, [shippingList, selectedGovernorate, selectedCenter, selectedArea]);

    const normalizedShippingList = useMemo(() => {
        if (!Array.isArray(shippingList)) return [];
        return shippingList.map((item) => ({
            ...item,
            centers: Array.isArray(item?.centers) ? item.centers : []
        }));
    }, [shippingList]);

    const selectedGovernorateData = useMemo(
        () => normalizedShippingList.find((item) => item.governorate === selectedGovernorate) || null,
        [normalizedShippingList, selectedGovernorate]
    );

    const availableCenters = useMemo(
        () => selectedGovernorateData?.centers || [],
        [selectedGovernorateData]
    );

    const selectedCenterData = useMemo(
        () => availableCenters.find((item) => item?.name === selectedCenter) || null,
        [availableCenters, selectedCenter]
    );

    const availableAreas = useMemo(
        () => Array.isArray(selectedCenterData?.areas) ? selectedCenterData.areas : [],
        [selectedCenterData]
    );

    const governorateOptions = useMemo(() =>
        normalizedShippingList
            .filter(item => item?.governorate)
            .map(item => ({ value: item.governorate, label: item.governorate })),
        [normalizedShippingList]
    );

    const centerOptions = useMemo(() => {
        return availableCenters
            .filter(item => item?.name)
            .map(item => ({ value: item.name, label: item.name }));
    }, [availableCenters]);

    const areaOptions = useMemo(() =>
        availableAreas
            .filter(item => item?.name)
            .map(item => ({ value: item.name, label: item.name })),
        [availableAreas]
    );

    const getShippingDetails = () => {
        return {
            cost: Number(msarefElchange) || 0,
            duration: longOfCharge || ''
        };
    };

    return {
        selectedGovernorate, setSelectedGovernorate,
        selectedCenter, setSelectedCenter,
        selectedArea, setSelectedArea,
        msarefElchange, longOfCharge,
        governorateOptions, centerOptions, areaOptions,
        getShippingDetails
    };
}
