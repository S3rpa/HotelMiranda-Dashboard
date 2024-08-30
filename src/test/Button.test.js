import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { SwitchToggle } from './Button'

test('The switch should have the background color #ccc for light theme', () => {
    render(<SwitchToggle role="switch" theme="light" />);

    const switchElement = screen.getByRole("switch");
    expect(switchElement).toHaveStyle({
        backgroundColor: "#ccc"
    });
});

test('The switch should have the background color #135846 for dark theme', () => {
    render(<SwitchToggle role="switch" theme="dark" />);

    const switchElement = screen.getByRole("switch");
    expect(switchElement).toHaveStyle({
        backgroundColor: "#135846"
    });
});